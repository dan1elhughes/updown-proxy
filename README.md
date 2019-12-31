# `updown-proxy`

A [now.sh](https://now.sh) serverless function which decorates the [Updown](https://updown.io) API response with metrics per check.

More specifically, it merges each element in the `/api/checks` response with `/api/checks/:token/metrics` for that token, to add **`apdex`**, **`timings`** and **`requests`**.

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
  "apdex": 1,
  "timings": {
    "redirect": 0,
    "namelookup": 94,
    "connection": 7,
    "handshake": 29,
    "response": 232,
    "total": 363
  },
  "requests": {
    "samples": 141,
    "failures": 0,
    "satisfied": 141,
    "tolerated": 0,
    "by_response_time": {
      "under125": 54,
      "under250": 108,
      "under500": 117,
      "under1000": 141,
      "under2000": 141,
      "under4000": 141
    }
  }
}
```

</p>
</details>

## Configuration

Environment variables:

- `UPDOWN_API_KEY`: Your read-only Updown API key.
