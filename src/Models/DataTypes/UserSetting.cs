using System;
using System.IO;

namespace Yatsugi.Models.DataTypes
{
    public class UserSettings
    {
        private const string SETTINGS_DIRECTORY_NAME = "Yatsugi";
        private const string SETTINGS_FILE_NAME = "settings.dat";

        public static string DataDirectory
            => Path.Combine(
                Environment.GetFolderPath(Environment.SpecialFolder.CommonApplicationData),
                SETTINGS_DIRECTORY_NAME
            );

        public static string SettingsFilePath
            => Path.Combine(
                DataDirectory,
                SETTINGS_FILE_NAME
            );
    }
}