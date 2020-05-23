using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Yatsugi.Models.DataTypes
{
    /// <summary>
    ///
    /// This is one record of lent.
    /// In detail, it is consisted by the info of the time lent and the group lent to.
    ///
    /// </summary>
    public class LentRecord
    {
        /// <summary>
        ///
        /// The beginning of the time the tool lent.
        ///
        /// </summary>
        public DateTime Start { get; set; }

        /// <summary>
        ///
        /// The end of the time the tool lent.
        /// Note that this value can be null and that represents the tool hasn't returned.
        ///
        /// </summary>
        public DateTime? End { get; set; }

        /// <summary>
        ///
        /// The group the tool been lent to.
        ///
        /// </summary>
        public LentGroup Group { get; set; }

        public override string ToString()
        {
            var sb = new StringBuilder();
            sb.Append(Start.ToBinary());
            sb.Append(",");
            sb.Append(End == null ? "null" : End?.ToBinary().ToString());
            sb.Append(",");
            sb.Append(Group.ID.ToString());
            return sb.ToString();
        }

        public void FromString(string text)
        {
            Start = DateTime.FromBinary(long.Parse(text.Split(",")[0]));
            End = text.Split(",")[1] == "null"
                ? null as DateTime?
                : DateTime.FromBinary(long.Parse(text.Split(",")[1]));
            Group = ToolDataBase.Groups
                .Where(p => p.ID == Guid.Parse(text.Split(",")[2]))
                .FirstOrDefault();
            if (Group == null)
            {
                LogWriter.Write("Not found group");
                throw new InvalidCastException();
            }
        }
    }
}
