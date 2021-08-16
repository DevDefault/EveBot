module.exports = function(app, io, client) {
	app.get("/dashboard", (req, res) => {
	    if (global.isLogged) {
	    	io.on('connection', (socket) => {
	            // socket.on('disconnect', () => {
	            //     console.log('user disconnected')
	            // })
			})

			var stepOneKeywords = [
				"Oi",
				"Oie",
				"Olá",
				"Bom dia",
				"Boa tarde",
				"Boa noite"
			]

			var stepOneOptions = [
				"1 - Boleto",
				"2 - Vendas",
				"3 - Atendente"
			]

			var stepOneMessage = `Olá sou um atendente virtual, deixe-me ajudar, escolha uma opção abaixo. 👇\n${stepOneOptions.join("\n")}`

			var stepTwoMessage

			client.onMessage((message) => {
				if (message.isGroupMsg === false) {
					if (stepOneKeywords.indexOf(message.body) != -1) {
						client.sendText(message.from, stepOneMessage).then((result) => {
							console.log(`Mensagem enviada com sucesso!`)
						}).catch((error) => {
							console.log(`Falha ao enviar a mensagem!`)
						})
					}

					switch (message.body) {
						case "1" :
							stepTwoMessage = `Por favor informe seu CPF:`
							client.sendText(message.from, stepTwoMessage).then((result) => {
								console.log(`Mensagem enviada com sucesso!`)
							}).catch((error) => {
								console.log(`Falha ao enviar a mensagem!`)
							})
							break
						case "2" :
							stepTwoMessage = `Aguarde estamos lhe transferindo para o departamento de vendas...`
							client.sendText(message.from, stepTwoMessage).then((result) => {
								console.log(`Mensagem enviada com sucesso!`)
							}).catch((error) => {
								console.log(`Falha ao enviar a mensagem!`)
							})
							break
						case "3" :
							stepTwoMessage = `Aguarde estamos lhe transferindo para um(a) atendente...`
							client.sendText(message.from, stepTwoMessage).then((result) => {
								console.log(`Mensagem enviada com sucesso!`)
							}).catch((error) => {
								console.log(`Falha ao enviar a mensagem!`)
							})
							break
					}
				}
			})

	        res.render("dashboard", {
	            user: req.session.user
	        })
	    } else {
	        res.redirect("/")
	    }
	})
}

