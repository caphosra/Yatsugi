using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;

namespace Yatsugi.Models.DataTypes
{
    /// <summary>
    ///
    /// The group which entried the cultural festival.
    ///
    /// </summary>
    public class LentGroup
    {
        /// <summary>
        ///
        /// The name of the group
        ///
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        ///
        /// The identifier for the group
        /// To generate a specific value, I used GUID which are the less prossible to be conflicted.
        ///
        /// </summary>
        public Guid ID { get; set; }

        /// <summary>
        ///
        /// Convert object to CSV format.
        ///
        /// </summary>
        public override string ToString()
        {
            var sb = new StringBuilder();
            sb.Append(Name);
            sb.Append(",");
            sb.Append(ID.ToString());
            return sb.ToString();
        }

        /// <summary>
        ///
        /// Convert a text comma separated to LentGroup object.
        ///
        /// </summary>
        public void FromString(string str)
        {
            if (str.Where(c => c == ',').Count() == 0)
            {
                Name = str;
                ID = Guid.NewGuid();
            }
            else
            {
                Name = str.Split(',')[0];
                ID = Guid.Parse(str.Split(',')[1]);
            }
        }

        public const string FIRST_LINE = "チーム名,ID(自動生成)";
    }
}