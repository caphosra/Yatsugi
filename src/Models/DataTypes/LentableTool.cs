using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Yatsugi.Models.DataTypes
{
    /// <summary>
    ///
    /// This class stores the information of the tool.
    ///
    /// </summary>
    public class LentableTool
    {
        /// <summary>
        ///
        /// The name of the tool.
        ///
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        ///
        /// The ID of the tool.
        ///
        /// </summary>
        public Guid ID { get; set; }

        /// <summary>
        ///
        /// The records which shows the history of the tool.
        ///
        /// </summary>
        public List<LentRecord> History { get; set; }
            = new List<LentRecord>();

        /// <summary>
        ///
        /// Is this tool lent now?
        ///
        /// </summary>
        public bool IsLentNow
            => History.Any(record => record.End == null);

        /// <summary>
        ///
        /// The name of the group tool lent.
        ///
        /// </summary>
        public string RentTo
        {
            get
            {
                var record = History.LastOrDefault();
                if (record == null || record.End != null)
                {
                    return "返却済み";
                }
                else
                {
                    return record.Group.Name;
                }
            }
        }

        public override string ToString()
        {
            var sb = new StringBuilder();
            sb.Append(Name);
            sb.Append(",");
            sb.Append(ID.ToString());
            foreach (var record in History)
            {
                sb.AppendLine();
                sb.Append(record.ToString());
            }
            return sb.ToString();
        }

        public void FromString(string text)
        {
            var texts = text.Split(Environment.NewLine, StringSplitOptions.None);
            var name_and_id = texts[0];
            Name = name_and_id.Split(",")[0];
            ID = Guid.Parse(name_and_id.Split(",")[1]);
            texts = texts.Skip(1).ToArray();
            foreach (var record_text in texts)
            {
                var record = new LentRecord();
                record.FromString(record_text);
                History.Add(record);
            }
        }
    }
}