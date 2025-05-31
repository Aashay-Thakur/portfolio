[![Netlify Status](https://api.netlify.com/api/v1/badges/18487a8e-65d0-41cd-95f4-56d2f9cd389b/deploy-status)](https://app.netlify.com/projects/portfolio-aashay-thakur/deploys)

```cmd
REM set cors origin for firebase storage bucket
gsutil cors set cors.json gs://<your-bucket-name>
```

```json
[
	{
		"origin": ["*"],
		"method": ["GET"],
		"maxAgeSeconds": 3600
	}
]
```

### TODO

-   [ ] Limit request to firebase storage bucket, sendgrid and gemini api
