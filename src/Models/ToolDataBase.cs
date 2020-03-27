using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

using YamlDotNet.Serialization;

using Yatsugi.Models.DataTypes;

namespace Yatsugi.Models
{
    public static class ToolDataBase
    {
        public static List<LentGroup> Groups { get; set; }
            = new List<LentGroup>();

        public static List<LentableTool> Tools { get; set; }
            = new List<LentableTool>();

        public static void LoadAll()
        {

        }

        public static void RecordAll()
        {
            var serializer = new SerializerBuilder().Build();
            var yaml = serializer.Serialize(Groups);
            Console.WriteLine(yaml);
            File.WriteAllText("C:\\groups.yml", yaml);
        }
    }
}
