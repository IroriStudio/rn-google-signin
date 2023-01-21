### 初めに
今回Expo(ReactNative)×firebaseのgoogle認証を実装するにあたり、
Expoのauthライブラリが非推奨となったため、
[react-native-google-signin/google-signin](https://github.com/react-native-google-signin/google-signin)を使用して実装します。
ちなみに、こちらExpo　Goでは動かないため、
カスタムネイティコードを追加しての実装となります。
[こちら](https://zenn.dev/tama8021/articles/0524_expo_firebase_auth_google_signin)を参考にしましたが、
一部補足しながら実装しました。

### インストール
まずは、Expo　の blank(TypeScript)で雛形を作ります。
```
expo init
```

今回使用するライブラリを一気にインストール。
```
expo install firebase  @react-navigation/native @react-navigation/native-stack react-native-safe-area-context react-native-screens react-native-dotenv
```

ひと通りExpoのライブラリの追加が終わったら、
こちらのコマンドを行なってください。
（ルートディレクトリに、iosとandroidそれぞれのディレクトリが作成されます。）

ビルドが終わったら、以下のライブラリをインストール。

```
$ expo install @react-native-google-signin/google-signin
```

### 環境変数の設定
[react-native-dotenv](https://www.npmjs.com/package/react-native-dotenv)を使用してアプリの環境変数を設定します。
まずは以下のコマンドでインストール。

```
$ yarn add -D react-native-dotenv 
```

ルートディレクトリに.envファイルを作成し、firebase関連の環境変数をここに書きます。
（.gitignoreに.envを追加。）
このままだとエラーが出るのでルートディレクトリにenv.d.tsを作成。
型を定義します。
```
// env.d.ts

declare module '@env' {
    export const API_KEY: string;
    export const AUTH_DOMAIN: string;
    export const PROJECT_ID: string;
    export const STORAGE_BUCKET: string;
    export const MESSAGING_SENDER_ID: string;
    export const APP_ID: string;
    export const MEASUREMENT_ID: string;
    export const GOOGLE_CLIENT_ID_FOR_IOS: string;
    export const GOOGLE_CLIENT_ID_FOR_ANDROID: string;
}

```
babel.config.jsに以下を追加
```
module.exports = function (api) {
    api.cache(true);
    return {
        presets: ["babel-preset-expo"],
        plugins: [
            [
                "module:react-native-dotenv",
                {
                    moduleName: "@env",
                    path: ".env",
                },
            ],
        ],
    };
};

```
これで以下のように環境変数を使用することができます。

 ```
 import { API_KEY, AUTH_DOMAIN } from '@env'
 ```

 @envが読み込めない場合はキャッシュをクリアするなどしてください。

### Android編

```
$ expo run:android

```
androidディレクトリが作られるので、
以下のコマンド
```
$ cd android && ./gradlew signingReport
```
一番上部に表示されるReleaseのSHA-1, SHA-256を、
firebaseコンソール-androidアプリ-SHA 証明書フィンガープリントにそれぞれ追加。
google-services.jsonをダウンロードし、ルートディレクトリに配置。

```
// app.json

  "expo": {
    "android": {
      "googleServicesFile": "./google-services.json"　 // ファイル名を追加
    },
    "plugins": ["@react-native-google-signin/google-signin"]　// プラグインを追加
  }
```
再度ビルド
```
$ expo run:android

```
これでAndroidは動くはずです。

### iOS編

```
// app.json

{
  "expo": {
    "android": {
      "googleServicesFile": "./google-services.json"
    },
    "ios": {
      "googleServicesFile": "./GoogleService-Info.plist" //　iOSの方も追加
    },
    "plugins": ["@react-native-google-signin/google-signin"]
  }
}
 ```
以下のコマンド。
```
$ expo run:ios

```
これで立ち上がるはずです。
