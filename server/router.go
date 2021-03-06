package server

import (
	"github.com/julienschmidt/httprouter"
	"github.com/wziww/bubble-test/server/control/images"
	"github.com/wziww/bubble-test/server/websocket"
)

func routerSet() *httprouter.Router {
	router := httprouter.New()
	router.GET("/ws", websocket.Upgrade)
	router.GET("/images/list", images.GetALL())
	router.GET("/images/search", images.Search())
	return router
}
