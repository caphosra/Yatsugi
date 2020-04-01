using System;
using System.IO;

using YamlDotNet.Serialization;

namespace Yatsugi.Models.DataTypes
{
    public class UserSettings
    {
        private const string SETTINGS_DIRECTORY_NAME = "Yatsugi";
        private const string SETTINGS_FILE_NAME = "settings.dat";

        public static string SettingsFilePath
            => Path.Combine(
                Environment.GetFolderPath(Environment.SpecialFolder.CommonApplicationData),
                SETTINGS_DIRECTORY_NAME,
                SETTINGS_FILE_NAME
            );

        public void WriteAll()
        {
            var serializer = new SerializerBuilder().Build();
            var yaml = serializer.Serialize(this);
            File.WriteAllText(SettingsFilePath, yaml);
        }

        public static UserSettings LoadAll()
        {
            if (File.Exists(SettingsFilePath))
            {
                var yaml = File.ReadAllText(SettingsFilePath);
                var serializer = new DeserializerBuilder().Build();
                return serializer.Deserialize<UserSettings>(yaml);
            }
            else return null;
        }

        public void Reset()
        {
            if (File.Exists(SettingsFilePath))
            {
                File.Delete(SettingsFilePath);
            }
        }
    }
}