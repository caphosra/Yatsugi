using System;
using System.Collections.Generic;
using System.IO;
using System.Reactive;
using System.Text;
using System.Threading.Tasks;

using Avalonia.Input;
using ReactiveUI;

using Yatsugi.Models;
using Yatsugi.Models.DataTypes;

namespace Yatsugi.ViewModels
{
    public class ToolManagerViewModel : ViewModelBase
    {
        public ReactiveCommand<Unit, Unit> OnBackButtonClicked { get; set; }

        public List<LentableTool> Tools { get; set; }

        public ToolManagerViewModel()
        {
            Tools = ToolDataBase.Tools;
            OnBackButtonClicked = ReactiveCommand.Create(() => { });
        }
    }
}
