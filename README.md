# `updown-proxy`

A [now.sh](https://now.sh) serverless function which decorates the [Updown](https://updown.io) API response with metrics per check.

More specifically, it merges each element in the `/api/checks` response with `/api/checks/:token` for that token, to add **`metrics`** field with apdex and timings.

## Example

<details><summary>Before (from direct API)</summary>
<p>

```json
{
  "token": "xxxx",
  "url": "https://danhughes.dev/healthz",
  "alias": "danhughes.dev",
  "last_status": 200,
  "uptime": 100,
  "down": false,
  "down_since": null,
  "error": null,
  "period": 600,
  "apdex_t": 1.0,
  "string_match": "",
  "enabled": true,
  "published": false,
  "disabled_locations": [],
  "last_check_at": "2019-12-31T23:29:33Z",
  "next_check_at": "2019-12-31T23:39:27Z",
  "mute_until": null,
  "favicon_url": null,
  "custom_headers": {},
  "http_verb": "GET/HEAD",
  "http_body": null,
  "ssl": {
    "tested_at": "2019-12-31T23:19:39Z",
    "valid": true,
    "error": null
  }
}
```

</p>
</details>

<details><summary>After (through updown-proxy)</summary>
<p>

```json
{
  "token": "xxxx",
  "url": "https://danhughes.dev/healthz",
  "alias": "danhughes.dev",
  "last_status": 200,
  "uptime": 100,
  "down": false,
  "down_since": null,
  "error": null,
  "period": 600,
  "apdex_t": 1,
  "string_match": "",
  "enabled": true,
  "published": false,
  "disabled_locations": [],
  "last_check_at": "2019-12-31T23:19:38Z",
  "next_check_at": "2019-12-31T23:29:33Z",
  "mute_until": null,
  "favicon_url": null,
  "custom_headers": {},
  "http_verb": "GET/HEAD",
  "http_body": null,
  "ssl": {
    "tested_at": "2019-12-31T23:19:39Z",
    "valid": true,
    "error": null
  },
  "metrics": {
    "apdex": 1,
    "timings": {
      "redirect": 0,
      "namelookup": 24,
      "connection": 3,
      "handshake": 33,
      "response": 499,
      "total": 559
    }
  }
}
```

</p>
</details>

## Configuration

Environment variables:

- `UPDOWN_API_KEY`: Your read-only Updown API key.
