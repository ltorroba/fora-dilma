package com.foradilma;

import com.facebook.react.ReactActivity;
import com.microsoft.codepush.react.CodePush;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;

import java.util.Arrays;
import java.util.List;

import com.zmxv.RNSound.RNSoundPackage;

import android.content.Intent;
import android.content.res.Configuration;
import com.github.yamill.orientation.OrientationPackage;

import com.microsoft.codepush.react.CodePush;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "ForaDilma";
    }

    /**
     * Returns whether dev mode should be enabled.
     * This enables e.g. the dev menu.
     */
    @Override
    protected boolean getUseDeveloperSupport() {
        return BuildConfig.DEBUG;
    }

    /**
     * A list of packages used by the app. If the app uses additional views
     * or modules besides the default ones, add more packages here.
     */
    @Override
    protected List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            new CodePush("ctglft3YRofTcZxAcWcJOE5h2mj-Eytu7Wteb", this, BuildConfig.DEBUG),
            new RNSoundPackage(),
            new OrientationPackage(this)
        );
    }

    // Required for react-native-orientation
    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
        Intent intent = new Intent("onConfigurationChanged");
        intent.putExtra("newConfig", newConfig);
        this.sendBroadcast(intent);
    }

    // Required for CodePush
    @Override
    protected String getJSBundleFile() {
        return CodePush.getBundleUrl();
    }
}
