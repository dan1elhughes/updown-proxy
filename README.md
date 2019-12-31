# `updown-proxy`

A [now.sh](https://now.sh) serverless function which decorates the [Updown](https://updown.io) API response with metrics per check.

More specifically, it merges each element in the `/api/checks` response with `/api/checks/:token/metrics` for that token.

## Configuration

Environment variables:

- `UPDOWN_API_KEY`: Your read-only Updown API key.
