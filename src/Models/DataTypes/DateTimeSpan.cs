using System;

namespace Yatsugi.Models.DataTypes
{
    /// <summary>
    ///
    /// It is a class which is made by combining DateTime and TimeSpan.
    ///
    /// </summary>
    public class DateTimeSpan
    {
        public DateTime Start { get; set; }
        public DateTime? End { get; set; }
    }
}