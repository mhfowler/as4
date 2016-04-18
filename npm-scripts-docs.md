build:vendor
: Builds vendor scripts.

build:js
: Builds KMS scripts.

watch:js
: Watches src/scripts, builds KMS scripts on modfication.

build:css
: Builds styles.

watch:css
: Watches src/styles, builds styles on modfication.

build:assets
: Copies assets from src/assets to dist/assets.

build:manifest
: Copies src/manifest.json to dist/manifest.json.

build:all
: Builds everything.

build
: Builds KMS scripts and styles. (This is what you'll usually use during development.)

watch
: Watch everything (independently).

clean:js
: Removes all files from dist/js.

clean:css
: Removes all files from dist/css.

clean:assets
: Removes all files from dist/assets.

clean
: Removes dist directory.
