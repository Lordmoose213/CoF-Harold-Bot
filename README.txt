To Update Heroku
	Edit Files
	Open Command Prompt in Directory
		$ git add .
		$ git status
			will show what is staged
		$ git commit
		$ git status
			will show that nothing is staged
		$ git push heroku master
			will report restart in heroku logs
Heroku Status
	$ heroku ps
		whether it is running and orb count
To Stop
	$ heroku ps:scale worker=0
To Start
	$ heroku ps:scale worker=1
To Start Locally
	$ heroku local
To View Logs
	$ heroku logs
		Prints
	$ heroku logs --tail
		prints and shows real-time updates
To view bot token
	$ heroku config
		displays environment variable
To change bot token
	$ heroku config:set BOT_TOKEN=NewBotToken
To interact with the orb
	$ heroku run bash
		will open bash prompt on linux orb running bot
To Add GitHub to local repo
	git remote add origin https://github.com/FontaineFuturistics/CoF-Harold-Bot.git
To Updapte GitHub
	Edit Files
