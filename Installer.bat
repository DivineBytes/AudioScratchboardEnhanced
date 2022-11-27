@ECHO OFF

REM Variables
SET "AudioScratchboard=Audio Scratchboard"
SET "AudioScratchboardEnhanced=%AudioScratchboard% (Enhanced)"
SET "AudioScratchboardEnhancedProjectName=AudioScratchboardEnhanced"

SET "SteamAppsPath=steamapps\common"
SET "SteamDownloadLink=https://store.steampowered.com/about/download"
SET "SteamRegistryPath=HKEY_LOCAL_MACHINE\SOFTWARE\WOW6432Node\Valve\Steam"
SET "SteamRegistryInstallPathKey=InstallPath"
SET "SteamStoreWallpaperEngineLink=https://store.steampowered.com/app/431960/Wallpaper_Engine/"
SET "SteamClientOpenWallpaperEngineLink=steam://openurl/%SteamStoreWallpaperEngineLink%"

SET "RegQuerySteamInstallPath=REG QUERY %SteamRegistryPath% /V %SteamRegistryInstallPathKey%"

SET "WallpaperEngine=Wallpaper Engine"
SET "WallpaperEngineInstallPath=%SteamAppsPath%\wallpaper_engine"
SET "WallpaperEngineProjectsPath=%WallpaperEngineInstallPath%\projects\myprojects"

TITLE %AudioScratchboardEnhanced% - Installer

:StartInstaller
CLS

ECHO Description:
ECHO Welcome to the %AudioScratchboardEnhanced% installer for %WallpaperEngine%.
ECHO.
ECHO Requirements:
ECHO - Steam - %SteamDownloadLink%
ECHO - %WallpaperEngine% - %SteamStoreWallpaperEngineLink%
ECHO.

REM Retrieve the Steam install path from the registry
%RegQuerySteamInstallPath% >nul 2>&1
IF %ERRORLEVEL%==0 (GOTO :SteamInstalledRegistry) ELSE (GOTO :SteamNotInstalledRegistry)

:SteamNotInstalledRegistry
ECHO Error: Steam is not installed!
ECHO.
CHOICE /M:"Would you like to open your web browser to download Steam?"
IF %ERRORLEVEL%==1 (GOTO :DownloadSteam) ELSE (GOTO :SkipSteamDownload)

:DownloadSteam
ECHO.
ECHO Opening the Steam download website...
ECHO Website Link: %SteamDownloadLink%
ECHO.
START %SteamDownloadLink%
ECHO Please download and install Steam to continue.
GOTO :RetryInstaller

:SkipSteamDownload
ECHO.
ECHO Unable to continue the installation until Steam is installed.
GOTO :RetryInstaller

:SteamInstalledRegistry
REM Retrieve the Steam install path from the registry
FOR /F "tokens=2* skip=2" %%a IN ('%RegQuerySteamInstallPath%') DO SET "SteamInstallPath=%%b"

REM Handle if the Steam installation directory exists
IF EXIST "%SteamInstallPath%" (GOTO :SteamDirectoryExists) ELSE (GOTO :SteamDirectoryNotFound)

:SteamDirectoryNotFound
ECHO Error: The Steam installation directory cannot be found! Please reinstall Steam.
GOTO :RetryInstaller

:SteamDirectoryExists
ECHO Installation Information:
ECHO - Steam -
ECHO Path: %SteamInstallPath%
ECHO.

REM Handle if the Wallpaper Engine installation directory exists
SET "WallpaperEngineFullPath=%SteamInstallPath%\%WallpaperEngineInstallPath%"
IF EXIST "%WallpaperEngineFullPath%" (GOTO :WallpaperEngineFound) ELSE (GOTO :WallpaperEngineNotFound)

:WallpaperEngineNotFound
ECHO Error: %WallpaperEngine% installation directory cannot be found! Please install %WallpaperEngine%.
ECHO.
ECHO Steam Store Link: %SteamStoreWallpaperEngineLink%
ECHO.
CHOICE /M:"Would you like to open %WallpaperEngine% in Steam?"
IF %ERRORLEVEL%==1 (GOTO :InstallWallpaperEngine) ELSE (GOTO :SkipInstallWallpaperEngine)

:InstallWallpaperEngine
ECHO Executing Command: %SteamClientOpenWallpaperEngineLink%
START %SteamClientOpenWallpaperEngineLink%
ECHO Please install %WallpaperEngine% for Steam to continue.
GOTO :RetryInstaller

:SkipInstallWallpaperEngine
ECHO Unable to continue until %WallpaperEngine% is installed.
ECHO Website Link: %SteamStoreWallpaperEngineLink%
GOTO :RetryInstaller

:WallpaperEngineFound
ECHO - %WallpaperEngine% -
ECHO Path: %WallpaperEngineFullPath%
ECHO.

REM Define the Wallpaper Engine project paths
SET "WallpaperEngineProjectsFullPath=%SteamInstallPath%\%WallpaperEngineProjectsPath%"
SET "AudioScratchboardEnhancedFullPath=%WallpaperEngineProjectsFullPath%\%AudioScratchboardEnhancedProjectName%"

ECHO - %WallpaperEngine% : Projects -
ECHO Path: %WallpaperEngineProjectsFullPath%
ECHO.
ECHO - %AudioScratchboardEnhanced% -
ECHO Install Path: %AudioScratchboardEnhancedFullPath%
ECHO.
CHOICE /M:"Install %AudioScratchboardEnhanced%?"
IF %ERRORLEVEL%==1 (GOTO :InstallAudioScratchboard) ELSE (GOTO :ExitInstaller)

:InstallAudioScratchboard
REM Copy the files to the installation directory
ECHO.
ECHO Installing the files to the destination...
ECHO.
XCOPY "%~dp0" "%AudioScratchboardEnhancedFullPath%\" /E /C /Q /Y
ECHO.
ECHO Completed the installation!
GOTO :ExitInstaller

:RetryInstaller
ECHO.
CHOICE /M:"Would you like to retry the installation?"
IF %ERRORLEVEL%==1 (GOTO :StartInstaller) ELSE (GOTO :ExitInstaller)

:ExitInstaller
ECHO.
PAUSE > NUL | SET /P = Press any key to Exit...
EXIT

:Egg
REM Try to add something special here...
GOTO :ExitInstaller