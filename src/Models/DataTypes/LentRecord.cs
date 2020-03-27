using System;

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
        /// The time the tool been lent.
        ///
        /// </summary>
        public DateTimeSpan TimeSpan { get; set; }

        /// <summary>
        ///
        /// The group the tool been lent to.
        ///
        /// </summary>
        public LentGroup Group { get; set; }
    }
}