@ECHO OFF

REM Enable support for UTF-8 Unicode
CHCP 65001 > NUL

REM Constants
SET "AudioScratchboard=Audio Scratchboard"
SET "AudioScratchboardEnhanced=%AudioScratchboard% (Enhanced)"
SET "AudioScratchboardEnhancedProjectName=AudioScratchboardEnhanced"

REM Installer: Information
SET "InstallerVersion=version 1.0.0"
SET "InstallerTitle=%AudioScratchboardEnhanced% - Installer"
SET "Description=%AudioScratchboardEnhanced% installer for Steam (Wallpaper Engine)"

REM Links: Steam
SET "SteamDownloadLink=https://cdn.akamai.steamstatic.com/client/installer/SteamSetup.exe"
SET "SteamWebsite=https://store.steampowered.com/about/download"

REM Registry: Steam
SET "SteamRegistryPath=HKEY_LOCAL_MACHINE\SOFTWARE\WOW6432Node\Valve\Steam"
SET "SteamRegistryInstallPathKey=InstallPath"
SET "RegQuerySteamInstallPath=REG QUERY %SteamRegistryPath% /V %SteamRegistryInstallPathKey%"

REM Links: Wallpaper Engine
SET "SteamStoreWallpaperEngineLink=https://store.steampowered.com/app/431960/Wallpaper_Engine/"
SET "SteamClientOpenWallpaperEngineURL=steam://openurl/%SteamStoreWallpaperEngineLink%"
SET "WallpaperEngineWebsite=https://www.wallpaperengine.io/en"

REM Installer: Text
SET "MenuInstallAudioScratchboard=Continue the installation?"
SET "MenuTitleInstallAudioScratchboard=■ INSTALL - AUDIO SCRATCHBOARD ENHANCED ■ & echo.═════════════════════════════════════════"
SET "MenuOptionsText=Choose an option (#):"
SET "PressAnyKeyToContinue=Press any key to continue..."
SET "PressAnyKeyToReturn=Press any key to return..."
SET "PressAnyKeyToExit=Press any key to exit..."
SET "ReturnToMainMenu=Return to Main Menu"
SET "ReturnToDownloadsMenu=Return to Downloads Menu"

TITLE %InstallerTitle%

:MainMenu
CLS
CALL :Description
ECHO.
CALL :Requirements
ECHO.
ECHO ■ MAIN MENU ■
ECHO ═════════════
ECHO.
ECHO 1 - Download (Steam ^|^ Wallpaper Engine)
ECHO 2 - Verify (Steam ^|^ Wallpaper Engine)
ECHO 3 - Install %AudioScratchboardEnhanced%
ECHO 4 - About
ECHO 5 - Exit
ECHO.
CHOICE /C 12345 /N /M "%MenuOptionsText%"

IF %ERRORLEVEL%==1 (
    GOTO :DownloadsMenu
) ELSE IF %ERRORLEVEL%==2 (
    GOTO :VerifyMenu
) ELSE IF %ERRORLEVEL%==3 (
    GOTO :Install
) ELSE IF %ERRORLEVEL%==4 (
    GOTO :About
) ELSE IF %ERRORLEVEL%==5 (
    GOTO :ExitWithoutInput
)
GOTO :EOF

:DownloadsMenu
CLS
CALL :Description
ECHO.
ECHO ■ DOWNLOADS MENU ■
ECHO ══════════════════
ECHO.
ECHO 1 - Steam
ECHO 2 - Wallpaper Engine
ECHO 3 - %ReturnToMainMenu%
ECHO.
CHOICE /C 123 /N /M "%MenuOptionsText%"

IF %ERRORLEVEL%==1 (
    GOTO :DownloadSteamMenu
) ELSE IF %ERRORLEVEL%==2 (
    GOTO :DownloadWallpaperEngineMenu
) ELSE IF %ERRORLEVEL%==3 (
    GOTO :MainMenu
)
GOTO :EOF

:VerifyMenu
CLS
CALL :Description
ECHO.
ECHO ■ VERIFY MENU ■
ECHO ═══════════════
ECHO.
ECHO 1 - Steam
ECHO 2 - Wallpaper Engine
ECHO 3 - %ReturnToMainMenu%
ECHO.
CHOICE /C 123 /N /M "%MenuOptionsText%"

IF %ERRORLEVEL%==1 (
    GOTO :VerifySteam
) ELSE IF %ERRORLEVEL%==2 (
    GOTO :VerifyWallpaperEngine
) ELSE IF %ERRORLEVEL%==3 (
    GOTO :MainMenu
)
GOTO :EOF

:Install
CLS
CALL :Description
ECHO.
ECHO %MenuTitleInstallAudioScratchboard%
ECHO.
ECHO ■ REQUIREMENTS: ■
ECHO ═════════════════
SET SteamInstallPathExists=
CALL :GetSteamInstallPathExists SteamInstallPathExists

IF %SteamInstallPathExists%==True (
    ECHO -^>^ Steam is installed.
) ELSE (
    ECHO -^>^ Error: Steam is not installed.
    ECHO.
    CALL :PressAnyKeyToReturn
    GOTO :MainMenu
)

SET WallpaperEnginePathExists=
CALL :GetWallpaperEnginePathExists WallpaperEnginePathExists

IF %WallpaperEnginePathExists%==True (
    ECHO -^>^ Wallpaper Engine is installed.
) ELSE (
    ECHO -^>^ Error: Wallpaper Engine is not installed.
    ECHO.
    CALL :PressAnyKeyToReturn
    GOTO :MainMenu
)
ECHO.

SET AudioScratchboardEnhancedPath=
CALL :GetAudioScratchbookPath AudioScratchboardEnhancedPath
ECHO %AudioScratchboardEnhanced% - Install Location:
ECHO Path: %AudioScratchboardEnhancedPath%
ECHO.

CHOICE /M "%MenuInstallAudioScratchboard%"
    IF %ERRORLEVEL%==1 (
        CLS
        CALL :Description
        ECHO.
        ECHO %MenuTitleInstallAudioScratchboard%
        ECHO.
        ECHO Destination Location:
        ECHO Path: %AudioScratchboardEnhancedPath%
        ECHO.
        ECHO Installing the files to the destination...
        ECHO.
        REM Copy the files to the installation directory
        XCOPY "%~dp0" "%AudioScratchboardEnhancedPath%\" /E /C /Q /Y
        ECHO.
        ECHO The installation has completed!
    ) ELSE (GOTO :MainMenu)
ECHO.
CALL :PressAnyKeyToReturn
GOTO :MainMenu

:Description
ECHO %InstallerTitle% [%InstallerVersion%]
ECHO.
ECHO ■ DESCRIPTION ■
ECHO ═══════════════
ECHO Welcome to the %Description%.
ECHO.
GOTO :EOF

:Requirements
ECHO ■ REQUIREMENTS: ■
ECHO ═════════════════
ECHO Steam:
ECHO -^>^ %SteamWebsite%
ECHO.
ECHO Wallpaper Engine:
ECHO -^>^ %WallpaperEngineWebsite%
ECHO -^>^ %SteamStoreWallpaperEngineLink%
ECHO.
GOTO :EOF

:DownloadSteamMenu
CLS
CALL :Description
ECHO.
ECHO ■ DOWNLOAD - STEAM ■
ECHO ════════════════════
ECHO.
ECHO 1 - Direct Download
ECHO 2 - Open Website
ECHO 3 - %ReturnToDownloadsMenu%
ECHO.
CHOICE /C 123 /N /M "%MenuOptionsText%"

IF %ERRORLEVEL%==1 (
    GOTO :DownloadSteamDirect
) ELSE IF %ERRORLEVEL%==2 (
    GOTO :OpenSteamWebsite
) ELSE IF %ERRORLEVEL%==3 (
    GOTO :DownloadsMenu
)
GOTO :EOF

:DownloadSteamDirect
CLS
CALL :Description
ECHO.
ECHO ■ DIRECT DOWNLOAD - STEAM ■
ECHO ═══════════════════════════
ECHO.
ECHO Starting the download...
ECHO Link: %SteamDownloadLink%
START %SteamDownloadLink%
ECHO.
CALL :PressAnyKeyToReturn
GOTO :DownloadSteamMenu

:OpenSteamWebsite
CLS
CALL :Description
ECHO.
ECHO ■ OPEN WEBSITE - STEAM ■
ECHO ════════════════════════
ECHO.
ECHO Opening the Steam website...
ECHO Link: %SteamWebsite%
START %SteamWebsite%
ECHO.
CALL :PressAnyKeyToReturn
GOTO :DownloadSteamMenu

:DownloadWallpaperEngineMenu
CLS
CALL :Description
ECHO.
ECHO ■ DOWNLOAD - WALLPAPER ENGINE ■
ECHO ═══════════════════════════════
ECHO.
ECHO 1 - Open Steam Store
ECHO 2 - Open Website
ECHO 3 - %ReturnToDownloadsMenu%
ECHO.
CHOICE /C 123 /N /M "%MenuOptionsText%"

IF %ERRORLEVEL%==1 (
    GOTO :OpenSteamStoreWallpaperEngine
) ELSE IF %ERRORLEVEL%==2 (
    GOTO :OpenWallpaperEngineWebsite
) ELSE IF %ERRORLEVEL%==3 (
    GOTO :DownloadsMenu
)
GOTO :EOF

:OpenSteamStoreWallpaperEngine
CLS
CALL :Description
ECHO.
ECHO ■ OPEN STEAM STORE - WALLPAPER ENGINE ■
ECHO ═══════════════════════════════════════
ECHO.
ECHO Executing Steam command...
ECHO Command: %SteamClientOpenWallpaperEngineURL%
START %SteamClientOpenWallpaperEngineURL%
ECHO.
CALL :PressAnyKeyToReturn
GOTO :DownloadWallpaperEngineMenu

:OpenWallpaperEngineWebsite
CLS
CALL :Description
ECHO.
ECHO ■ OPEN WEBSITE - WALLPAPER ENGINE ■
ECHO ═══════════════════════════════════
ECHO.
ECHO Opening the Wallpaper Engine website...
ECHO Link: %WallpaperEngineWebsite%
START %WallpaperEngineWebsite%
ECHO.
CALL :PressAnyKeyToReturn
GOTO :DownloadWallpaperEngineMenu

:VerifySteam
CLS
CALL :Description
ECHO.
ECHO ■ VERIFY - STEAM ■
ECHO ══════════════════
ECHO.
ECHO Information:
SET SteamRegistryExists=
CALL :GetSteamRegistryExists SteamRegistryExists
ECHO Registry: %SteamRegistryExists%
SET SteamInstallPath=
CALL :GetSteamRegistryInstallPath SteamInstallPath
SET SteamInstalled=
CALL :GetSteamInstallPathExists SteamInstalled
ECHO Installed: %SteamInstalled%
ECHO.
ECHO Locations:
ECHO Path: %SteamInstallPath%
ECHO.
CALL :PressAnyKeyToReturn
GOTO :VerifyMenu

:VerifyWallpaperEngine
CLS
CALL :Description
ECHO.
ECHO ■ VERIFY - WALLPAPER ENGINE ■
ECHO ═════════════════════════════
ECHO.
ECHO Information:
SET WallpaperEngineInstalled=
CALL :GetWallpaperEnginePathExists WallpaperEngineInstalled
ECHO Installed: %WallpaperEngineInstalled%
ECHO.
ECHO Locations:
SET WallpaperEnginePath=
CALL :GetWallpaperEnginePath WallpaperEnginePath
ECHO Path: %WallpaperEnginePath%
SET WallpaperEngineProjectsPath=
CALL :GetWallpaperEngineProjectsPath WallpaperEngineProjectsPath
ECHO Projects: %WallpaperEngineProjectsPath%
ECHO.
CALL :PressAnyKeyToReturn
GOTO :VerifyMenu

:GetSteamRegistryExists
REM Determines whether Steam install path exists in the registry
%RegQuerySteamInstallPath% >nul 2>&1
IF %ERRORLEVEL%==0 (SET "%1=True") ELSE (SET "%1=False")
GOTO :EOF

:GetSteamRegistryInstallPath
SET SteamRegistryExists=
CALL :GetSteamRegistryExists SteamRegistryExists
IF %SteamRegistryExists%==True (
    REM Retrieve the Steam install path from the registry
    FOR /F "tokens=2* skip=2" %%a IN ('%RegQuerySteamInstallPath%') DO SET "%1=%%b"
)
GOTO :EOF

:GetSteamInstallPathExists
SET SteamInstallPath=
CALL :GetSteamRegistryInstallPath SteamInstallPath
REM Validate the Steam installation directory exists
IF EXIST "%SteamInstallPath%" (SET "%1=True") ELSE (SET "%1=False")
GOTO :EOF

:GetWallpaperEnginePath
SET SteamInstallPath=
CALL :GetSteamRegistryInstallPath SteamInstallPath
SET "%1=%SteamInstallPath%\steamapps\common\wallpaper_engine"
GOTO :EOF

:GetWallpaperEngineProjectsPath
SET WallpaperEnginePath=
CALL :GetWallpaperEnginePath WallpaperEnginePath
SET "%1=%WallpaperEnginePath%\projects\myprojects"
GOTO :EOF

:GetWallpaperEnginePathExists
REM Validate the Wallpaper Engine installation directory exists
SET WallpaperEnginePath=
CALL :GetWallpaperEnginePath WallpaperEnginePath
IF EXIST "%WallpaperEnginePath%" (SET "%1=True") ELSE (SET "%1=False")
GOTO :EOF

:GetAudioScratchbookPath
    SET WallpaperEngineProjectsPath=
    CALL :GetWallpaperEngineProjectsPath WallpaperEngineProjectsPath
    SET "%1=%WallpaperEngineProjectsPath%\%AudioScratchboardEnhancedProjectName%"
GOTO :EOF

:PressAnyKeyToContinue
PAUSE > NUL | SET /P = %PressAnyKeyToContinue%
GOTO :ExitWithoutInput

:PressAnyKeyToReturn
PAUSE > NUL | SET /P = %PressAnyKeyToReturn%
GOTO :ExitWithoutInput

:ExitWithInput
PAUSE > NUL | SET /P = %PressAnyKeyToExit%
GOTO :ExitWithoutInput

:ExitWithoutInput
EXIT /B 0

:About
CLS
ECHO %InstallerTitle% [%InstallerVersion%]
FOR /F "delims=: tokens=*" %%A IN ('FINDSTR /B ::: "%~f0"') DO @ECHO(%%A)
:::         .     .
:::    ..   8"=,,88,   _.
:::     8""=""8'  "88a88'
:::.. .;88m a8   ,8"" "8
::: "8"'  "88"  A"     8;
:::   "8,  "8   8       "8,
:::    "8   8,  8,       "8
:::     8,  "8, "8,    ___8,
:::     "8,  "8, "8mm""""""8m.
:::      "8,am888i"'   ,mm"
:::      ,8"  _8"  .m888"
:::     ,88P"""""I888888
:::     "'         "I888
:::                  "I8,
:::                   "I8
:::                    "I8_
:::        ,mmeem.m""i, I8""  ,mmeem,'.
:::       m""    . "8.8 I8  ,8"   .  "88
:::      i8  . '  ,mi""8I8 ,8 . '  ,8" 88
:::      88.' ,mm""    "8I88"m,,mm'"    8
:::      "8_m""         "I8   ""'
:::       "8             I8
:::                      I8_
::: Inspired by a        I8""
::: beautiful & special  I8
::: flower. - E. D.     _I8
:::                    ""I8
:::                      I8
CALL :PressAnyKeyToReturn
GOTO :MainMenu