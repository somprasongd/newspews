package main

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/somprasongd/newspews/config"
	"github.com/somprasongd/newspews/database"
	"github.com/somprasongd/newspews/handlers"
	"github.com/somprasongd/newspews/logger"
	"github.com/somprasongd/newspews/middleware"
	"github.com/somprasongd/newspews/repository"
	"github.com/somprasongd/newspews/services"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

func main() {
	config.LoadConfig()

	database.ConnectDB()

	// เปลี่ยนตรงนี้
	r := mux.NewRouter()
	// define route
	setupRouter(r)

	// handle cors
	hc := cors.New(cors.Options{
		AllowCredentials: true,
		AllowedMethods:   []string{"POST"},
	})

	// Insert the middleware
	handler := hc.Handler(r)
	port := config.Config.App.Port
	srv := &http.Server{
		Addr: fmt.Sprintf(":%v", port),
		// Good practice to set timeouts to avoid Slowloris attacks.
		WriteTimeout: time.Second * 15,
		ReadTimeout:  time.Second * 15,
		IdleTimeout:  time.Second * 60,
		Handler:      handler, // Pass our instance of gorilla/mux in.
	}

	// Run our server in a goroutine so that it doesn't block.
	go func() {
		logger.Info(fmt.Sprintf("Starting server at port %v", port))
		if err := srv.ListenAndServe(); err != nil {
			logger.Error(err.Error())
		}
	}()

	// Create channel to listen for signals.
	signalChan := make(chan os.Signal, 1)
	// Accept graceful shutdowns when quit via SIGINT (Ctrl+C) or SIGTERM
	signal.Notify(signalChan, syscall.SIGINT, syscall.SIGTERM)

	// Block until receive signal.
	sig := <-signalChan
	logger.Info(fmt.Sprintf("%s signal caught", sig))

	// Create a deadline to wait for.
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*15)
	defer cancel()

	// Add extra handling here to clean up resources, such as flushing logs and
	// closing any database or Redis connections.

	// Gracefully shutdown the server by waiting on existing requests (except websockets).
	if err := srv.Shutdown(ctx); err != nil {
		logger.Error(fmt.Sprintf("server shutdown failed: %+v", err))
	}
	logger.Info("server exited")
	os.Exit(0)
}

func setupRouter(r *mux.Router) {
	scoreSrv := services.NewScoreService()
	scoreHandler := handlers.NewScoreHandler(scoreSrv)
	scoreR := r.PathPrefix("/api/newspews").Subrouter()
	scoreR.HandleFunc("", scoreHandler.CreateTodo).Methods(http.MethodPost)

	logRepo := repository.NewAccessLogRepoDB(database.DB)
	logSrv := services.NewLogService(logRepo)
	logHandler := handlers.NewLogHandler(logSrv)
	logR := r.PathPrefix("/api/newspews/log").Subrouter()
	logR.HandleFunc("", logHandler.CreateLog).Methods(http.MethodPost)

	r.Use(middleware.Logging)
	// r.Use(middleware.PanicRecovery)
}
