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
