#!/bin/bash

./gradlew ${1:-installDevMinSdkDevKernelDebug} --stacktrace && adb shell am start -n com.demornapp.nfq/host.exp.exponent.MainActivity
