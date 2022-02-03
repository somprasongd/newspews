package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/somprasongd/newspews/dto"
	"github.com/somprasongd/newspews/services"
)

type scoreHandler struct {
	srv services.ScoreService
}

func NewScoreHandler(srv services.ScoreService) *scoreHandler {
	return &scoreHandler{
		srv: srv,
	}
}

func (h scoreHandler) CreateTodo(w http.ResponseWriter, r *http.Request) {
	var dto dto.InputDTO

	// Try to decode the request body into the struct. If there is an error,
	// respond to the client with the error message and a 400 status code.
	err := json.NewDecoder(r.Body).Decode(&dto)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	response, appErr := h.srv.CalculateScore(dto)

	if appErr != nil {
		writeResponse(w, appErr.Code, appErr)
		return
	}

	writeResponse(w, http.StatusOK, response)
}
