using System;
using System.IO;

using YamlDotNet.Serialization;

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

        public void WriteAll()
        {
            var serializer = new SerializerBuilder().Build();
            var yaml = serializer.Serialize(this);

            Directory.CreateDirectory(Path.GetDirectoryName(SettingsFilePath));
            File.WriteAllText(SettingsFilePath, yaml);

            LogWriter.Write($"Update settings (Path: {SettingsFilePath})");
        }

        public static UserSettings LoadAll()
        {
            if (File.Exists(SettingsFilePath))
            {
                var yaml = File.ReadAllText(SettingsFilePath);

                var serializer = new DeserializerBuilder().Build();
                var settings = serializer.Deserialize<UserSettings>(yaml);

                LogWriter.Write($"Load settings (Path: {SettingsFilePath})");

                return settings;
            }
            else
            {
                return Initalize();
            }
        }

        public static UserSettings Initalize()
        {
            if (File.Exists(SettingsFilePath))
            {
                File.Delete(SettingsFilePath);
            }

            var defaultSetting = new UserSettings();
            defaultSetting.WriteAll();
            return defaultSetting;
        }
    }
}