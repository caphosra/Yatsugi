using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;

using Yatsugi.Models.DataTypes;

namespace Yatsugi.Models
{
    public static partial class ToolDataBase
    {
        public static List<LentGroup> Groups { get; set; }
            = new List<LentGroup>();

        public static List<LentableTool> Tools { get; set; }
            = new List<LentableTool>();

        private const string GROUPS_DATA_FILE_NAME = "groups.csv";

        public static string GroupsDataFilePath
            => Path.Combine(
                UserSettings.DataDirectory,
                GROUPS_DATA_FILE_NAME
            );

        public static void LoadAll()
        {
            //
            // Groups
            //
            if (File.Exists(GroupsDataFilePath))
            {
                Groups = new List<LentGroup>();

                var csv = File.ReadAllText(GroupsDataFilePath);
                foreach(var content in csv.Split(Environment.NewLine, StringSplitOptions.None))
                {
                    var group = new LentGroup();
                    group.FromString(content);
                    Groups.Add(group);
                }

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
            foreach (var file in files)
            {
                var csv = File.ReadAllText(file);
                var tool = new LentableTool();
                tool.FromString(csv);
                Tools.Add(tool);

                LogWriter.Write($"Load tool info (Path: {file})");
            }

            RecordAll();
        }

        public static void RecordAll()
        {
            //
            // Groups
            //
            var texts = Groups
                .Select(group => group.ToString());
            var text = string.Join(Environment.NewLine, texts);
            Directory.CreateDirectory(Path.GetDirectoryName(GroupsDataFilePath));
            File.WriteAllText(GroupsDataFilePath, text);

            LogWriter.Write($"Record groups list (Path: {GroupsDataFilePath})");

            //
            // Tools
            //
            foreach (var tool in Tools)
            {
                var file_path = GetToolDataFilePath(tool);
                Directory.CreateDirectory(Path.GetDirectoryName(file_path));
                File.WriteAllText(file_path, tool.ToString());

                LogWriter.Write($"Record tool info (Path: {file_path})");
            }
        }

        private static string GetToolDataFilePath(LentableTool tool)
            => $"tool-{tool.ID.ToString()}.csv";
    }
}
