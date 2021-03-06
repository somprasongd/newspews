package main

import (
	"encoding/json"
	"fmt"
	"syscall/js"

	"github.com/somprasongd/newspews/services"
)

var (
	c        chan bool
	scoreSrv services.ScoreService
)

// init is called even before main is called. This ensures that as soon as our WebAssembly module is ready in the browser, it runs and prints "Hello, webAssembly!" to the console. It then proceeds to create a new channel. The aim of this channel is to keep our Go app running until we tell it to abort.
func init() {
	fmt.Println("NEWSPEWS, WebAssembly!")
	scoreSrv = services.NewScoreService()
	c = make(chan bool)

}

func main() {

	js.Global().Set("calScore", calWrapper())
	fmt.Println("Loaded")

	// tells the channel we created in init() to "stop".
	<-c
	println("Stop")
}

func calWrapper() js.Func {
	jsonFunc := js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		if len(args) != 1 {
			result := map[string]interface{}{
				"error": "Invalid no of arguments passed",
			}
			return result
		}
		inputJSON := args[0].String()
		fmt.Printf("input %s\n", inputJSON)

		dto := services.InputDTO{}
		if err := json.Unmarshal([]byte(inputJSON), &dto); err != nil {
			errStr := fmt.Sprintf("unable to parse JSON. Error %s occurred\n", err)
			fmt.Println(errStr)
			result := map[string]interface{}{
				"error": errStr,
			}
			return result
		}

		fmt.Println(dto)

		resp, err := scoreSrv.CalculateScore(dto)
		if err != nil {
			result := map[string]interface{}{
				"error": err.Error(),
			}
			fmt.Println(err.Error())
			return result
		}

		json, err := json.MarshalIndent(resp, "", "  ")
		if err != nil {
			errStr := fmt.Sprintf("unable to parse JSON. Error %s occurred\n", err)
			fmt.Println(errStr)
			result := map[string]interface{}{
				"error": errStr,
			}
			return result
		}
		return string(json)
	})
	return jsonFunc
}
