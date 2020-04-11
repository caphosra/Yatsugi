using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;

using Avalonia.Input;
using YamlDotNet.Serialization;

using Yatsugi.Models.DataTypes;

namespace Yatsugi.Models
{
    public static class KeyEx
    {
        public static string ConvertToString(this Key key)
        {
            switch(key)
            {
                case Key.OemMinus:
                    return "-";
                // Integer
                case Key k when ((int)Key.D0 <= (int)k && (int)k <= (int)Key.D9):
                    return ((int)key - (int)Key.D0).ToString();
                default:
                    return key.ToString();
            }
        }
    }
}
