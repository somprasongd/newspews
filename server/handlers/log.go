package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/somprasongd/newspews/dto"
	"github.com/somprasongd/newspews/services"
)

type logHandler struct {
	logSrv services.LogService
}

func NewLogHandler(logSrv services.LogService) *logHandler {
	return &logHandler{
		logSrv: logSrv,
	}
}

func (h logHandler) CreateLog(w http.ResponseWriter, r *http.Request) {
	var geo dto.Geo

	// Try to decode the request body into the struct. If there is an error,
	// respond to the client with the error message and a 400 status code.
	err := json.NewDecoder(r.Body).Decode(&geo)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	appErr := h.logSrv.Log(geo)

	if appErr != nil {
		writeResponse(w, appErr.Code, appErr)
		return
	}

	w.WriteHeader(http.StatusCreated)
}
