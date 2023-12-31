#!/bin/bash

# required: git, [cargo-make](https://crates.io/crates/cargo-make/0.3.54#installation), [@cosmwasm/ts-codegen](https://www.npmjs.com/package/@cosmwasm/ts-codegen)

TAG=$1

if [ -z "$TAG" ]
then
  echo "TAG is empty"
  exit 1
fi

rm -rf ./gmx_wasm
rm -rf ./src/code-gen

set -e

git clone https://github.com/chadury2021/gmx_wasm.git

cd gmx_wasm
git fetch --tags
git checkout $TAG

cargo make generate-all-schemas
cargo make ts-code-gen

cd ../
mv ./gmx_wasm/ts ./src/code-gen

rm -rf ./gmx_wasm
