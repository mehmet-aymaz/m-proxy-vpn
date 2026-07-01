plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
}

// Read signing properties from local.properties (not committed to git)
import java.util.Properties
val localProps = Properties()
val localPropsFile = rootProject.file("local.properties")
if (localPropsFile.exists()) {
    localPropsFile.inputStream().use { localProps.load(it) }
}

android {
    namespace = "com.mproxy.vpn"
    compileSdk = 34

    defaultConfig {
        applicationId = "com.mproxy.vpn"
        minSdk = 24
        targetSdk = 34
        versionCode = 6
        versionName = "1.3.0"
    }

    signingConfigs {
        create("release") {
            val keystorePath = localProps.getProperty("KEYSTORE_PATH", "")
            val keystorePass = localProps.getProperty("KEYSTORE_PASSWORD", "")
            val keyAliasVal = localProps.getProperty("KEY_ALIAS", "")
            val keyPass = localProps.getProperty("KEY_PASSWORD", "")
            if (keystorePath.isNotEmpty()) {
                storeFile = file(keystorePath)
                storePassword = keystorePass
                keyAlias = keyAliasVal
                keyPassword = keyPass
            }
        }
    }

    buildTypes {
        debug {
            isMinifyEnabled = false
            isShrinkResources = false
        }
        release {
            isMinifyEnabled = true
            isShrinkResources = true
            signingConfig = signingConfigs.getByName("release")
            proguardFiles.addAll(
                listOf(
                    getDefaultProguardFile("proguard-android-optimize.txt"),
                    file("proguard-rules.pro")
                )
            )
        }
    }

    // APK splits removed: AAB (Android App Bundle) handles ABI splits automatically
    // This is required for Play Store submission

    packaging {
        resources {
            excludes += listOf(
                "META-INF/*.kotlin_module",
                "META-INF/DEPENDENCIES",
                "META-INF/LICENSE",
                "META-INF/LICENSE.txt",
                "META-INF/NOTICE",
                "META-INF/NOTICE.txt",
                "META-INF/*.SF",
                "META-INF/*.DSA",
                "META-INF/*.RSA",
                "kotlin/**",
                "**.properties",
                "DebugProbesKt.bin",
            )
        }
        jniLibs {
            useLegacyPackaging = true
        }
    }
    
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_1_8
        targetCompatibility = JavaVersion.VERSION_1_8
    }
    
    kotlinOptions {
        jvmTarget = "1.8"
    }

    sourceSets {
        getByName("main") {
            assets.srcDirs("src/main/assets")
        }
    }
}

dependencies {
    implementation("androidx.core:core-ktx:1.12.0")
    implementation("androidx.appcompat:appcompat:1.6.1")
    implementation("com.google.android.material:material:1.11.0")
    implementation("com.scottyab:rootbeer-lib:0.1.0")
    implementation("androidx.security:security-crypto:1.0.0")
    
    // sing-box libbox
    implementation(fileTree(mapOf("dir" to "libs", "include" to listOf("*.aar", "*.jar"))))
}
