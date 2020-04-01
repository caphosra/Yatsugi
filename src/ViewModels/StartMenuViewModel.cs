using System;
using System.Collections.Generic;
using System.IO;
using System.Reactive;
using System.Text;
using System.Threading.Tasks;

using ReactiveUI;

using Yatsugi.Models;

namespace Yatsugi.ViewModels
{
    public class StartMenuViewModel : ViewModelBase
    {
        public StartMenuViewModel()
        {

        }

        private void OnReturnButtonClicked()
        {
            ToolDataBase.LoadAll();
        }

        private void OnLentButtonClicked()
        {
            ToolDataBase.RecordAll();
        }
    }
}
