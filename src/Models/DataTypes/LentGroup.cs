using System;
using System.Collections.Generic;

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
        /// The tools which the group borrowed and haven't returned.
        ///
        /// </summary>
        public List<LentableTool> LentTools { get; set; }
            = new List<LentableTool>();
    }
}