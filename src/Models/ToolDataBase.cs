using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

using YamlDotNet.Serialization;

using Yatsugi.Models.DataTypes;

namespace Yatsugi.Models
{
    public static partial class ToolDataBase
    {
        public static List<LentGroup> Groups { get; set; }
            = new List<LentGroup>();

        public static List<LentableTool> Tools { get; set; }
            = new List<LentableTool>();

        private static ISerializer Serializer { get; set; }

        private static IDeserializer Deserializer { get; set; }

        private const string GROUPS_DATA_FILE_NAME = "groups.yml";

        public static string GroupsDataFilePath
            => Path.Combine(
                UserSettings.DataDirectory,
                GROUPS_DATA_FILE_NAME
            );

        public static void LoadAll()
        {
            if (Deserializer == null)
            {
                Deserializer = new DeserializerBuilder().Build();
            }

            if(File.Exists(GroupsDataFilePath))
            {
                var yaml = File.ReadAllText(GroupsDataFilePath);
                Groups = Deserializer.Deserialize<List<LentGroup>>(yaml);
            }
            else
            {
                Groups = new List<LentGroup>();
            }
        }

        public static void RecordAll()
        {
            if (Serializer == null)
            {
                Serializer = new SerializerBuilder().Build();
            }

            var yaml = Serializer.Serialize(Groups);
            Directory.CreateDirectory(Path.GetDirectoryName(GroupsDataFilePath));
            File.WriteAllText(GroupsDataFilePath, yaml);
        }
    }
}
