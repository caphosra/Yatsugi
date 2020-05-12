using System;
using System.Collections.Generic;
using System.Linq;

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
        public List<DateTimeSpan> History { get; set; }
            = new List<DateTimeSpan>();

        /// <summary>
        ///
        /// Is this tool lent now?
        ///
        /// </summary>
        public bool IsLentNow
            => History.Any(record => record.End == null);
    }
}