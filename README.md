# Api server/doc: [here](https://clone-messengerr.herokuapp.com)

# Backend source: [here](https://github.com/TrangNguyen99/messenger-server)

# Setup

## Data

```bash
$ yarn add @reduxjs/toolkit
$ yarn add react-redux
$ yarn add --dev @types/react-redux

$ yarn add axios

$ yarn add @react-native-async-storage/async-storage
$ yarn add react-native-encrypted-storage
```

## Socket io

```bash
$ yarn add socket.io-client
```

## Json web token

```bash
$ yarn add jwt-decode
```

## Navigation

```bash
$ yarn add @react-navigation/native
$ yarn add react-native-screens react-native-safe-area-context

$ yarn add @react-navigation/native-stack

$ yarn add @react-navigation/bottom-tabs
```

Edit `MainActivity.java`:

```java
import android.os.Bundle;

@Override
protected void onCreate(Bundle savedInstanceState) {
  super.onCreate(null);
}
```

## Style

```bash
$ yarn add styled-components
$ yarn add --dev @types/styled-components-react-native
```

Edit `package.json`:

```json
{
  "resolutions": {
    "styled-components": "^5"
  }
}
```

## Svg

```bash
$ yarn add react-native-svg
```

## Form validation

```bash
$ yarn add react-hook-form
$ yarn add @hookform/resolvers yup
```

## Keyboard

```bash
$ yarn add react-native-keyboard-aware-scroll-view
```

## Device info

```bash
$ yarn add react-native-device-info
```

Something went wrong if you change sdk version to 31, try update jdk version from 1.8 to 11

## Notification

```bash
yarn add @notifee/react-native
```

Open `android/build.gradle` for editing, and add these lines in your `allprojects` `repositories` section:

```gradle
// optional
buildscript {
  ext {
    compileSdkVersion = 31 // If something went wrong, try it
    targetSdkVersion = 31 // If something went wrong, try it
  }
}

// required
allprojects {
  repositories {
    maven {
      url "$rootDir/../node_modules/@notifee/react-native/android/libs"
    }
  }
}
```

If something went wrong, edit `AndroidManifest.xml`:

```xml
<activity
  android:name=".MainActivity"
  android:exported="true" <!-- try it -->
>
</activity>
```

## Firebase (Firebase cloud messaging)

```bash
$ yarn add @react-native-firebase/app
$ yarn add @react-native-firebase/messaging
```

Go to `Firebase console`, `Add Firebase to your Android app` and follow the instructions

## UI

```bash
$ yarn add react-native-modal

$ yarn add lottie-react-native # ios need more step
```

## Proguard (android only)

Edit `android/app/build.gradle`:

```gradle
def enableProguardInReleaseBuilds = true
```

## Hermes android

Edit `android/app/build.gradle`:

```gradle
project.ext.react = [
  enableHermes: true
]
```

Also, if you're using ProGuard, you will need to add these rules in `proguard-rules.pro`:

```pro
-keep class com.facebook.hermes.unicode.** { *; }
-keep class com.facebook.jni.** { *; }
```

Next, if you've already built your app at least once, clean the build:

```bash
$ cd android && ./gradlew clean
```
