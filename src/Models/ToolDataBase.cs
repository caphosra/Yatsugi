using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;

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

            //
            // Groups
            //
            if(File.Exists(GroupsDataFilePath))
            {
                var yaml = File.ReadAllText(GroupsDataFilePath);
                Groups = Deserializer.Deserialize<List<LentGroup>>(yaml);

                LogWriter.Write($"Load groups list (Path: {GroupsDataFilePath})");
            }
            else
            {
                Groups = new List<LentGroup>();

                LogWriter.Write($"Init groups list");
            }

            //
            // Tools
            //
            var files = Directory.GetFiles(UserSettings.DataDirectory)
                .Where(file => Regex.IsMatch(Path.GetFileName(file), "tool-.*"))
                .ToList();
            Tools = new List<LentableTool>();
            foreach(var file in files)
            {
                var yaml = File.ReadAllText(file);
                var tool = Deserializer.Deserialize<LentableTool>(yaml);
                Tools.Add(tool);

                LogWriter.Write($"Load tool info (Path: {file})");
            }
        }

        public static void RecordAll()
        {
            if (Serializer == null)
            {
                Serializer = new SerializerBuilder().Build();
            }

            //
            // Groups
            //
            var yaml = Serializer.Serialize(Groups);
            Directory.CreateDirectory(Path.GetDirectoryName(GroupsDataFilePath));
            File.WriteAllText(GroupsDataFilePath, yaml);

            LogWriter.Write($"Record groups list (Path: {GroupsDataFilePath})");

            //
            // Tools
            //
            foreach(var tool in Tools)
            {
                var file_path = GetToolDataFilePath(tool);
                yaml = Serializer.Serialize(tool);
                Directory.CreateDirectory(Path.GetDirectoryName(file_path));
                File.WriteAllText(file_path, yaml);

                LogWriter.Write($"Record tool info (Path: {file_path})");
            }
        }

        private static string GetToolDataFilePath(LentableTool tool)
            => $"tool-{tool.ID}.yml";
    }
}
