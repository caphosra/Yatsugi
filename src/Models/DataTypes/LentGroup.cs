using System;
using System.Collections.Generic;
using System.Text;

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
            Name = str.Split(',')[0];
            ID = Guid.Parse(str.Split(',')[1]);
        }
    }
}