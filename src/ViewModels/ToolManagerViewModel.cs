using System;
using System.Collections.Generic;
using System.IO;
using System.Reactive;
using System.Text;
using System.Threading.Tasks;

using Avalonia.Input;

using Yatsugi.Models;
using Yatsugi.Models.DataTypes;

namespace Yatsugi.ViewModels
{
    public class ToolManagerViewModel : ViewModelBase
    {
        public ToolManagerViewModel()
        {
            Tools = ToolDataBase.Tools;
        }

        public List<LentableTool> Tools { get; set; }
    }
}
