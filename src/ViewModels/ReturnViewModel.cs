using System;
using System.Collections.Generic;
using System.IO;
using System.Reactive;
using System.Text;
using System.Threading.Tasks;

using Avalonia.Data.Converters;
using Avalonia.Input;
using ReactiveUI;

using Yatsugi.Models;
using Yatsugi.Models.DataTypes;

namespace Yatsugi.ViewModels
{
    public class ReturnViewModel : ViewModelBase
    {
        private LentableTool scannedTool;
        public LentableTool ScannedTool
        {
            get => scannedTool;
            set
            {
                scannedTool = value;
                this.RaisePropertyChanged("ScannedToolName");
                this.RaisePropertyChanged("StatusImageUrl");
                this.RaisePropertyChanged("ReturnButtonEnabled");
            }
        }

        public string ScannedToolName => ScannedTool != null ? ScannedTool.Name : "Waiting for scan...";

        public string StatusImageUrl => ScannedTool == null ? "resm:Yatsugi.Assets.Loading.gif" : "resm:Yatsugi.Assets.OKCheck.gif";

        public bool ReturnButtonEnabled => ScannedTool != null;

        public ReactiveCommand<Unit, LentableTool> OnReturnButtonClicked { get; set; }
        public ReactiveCommand<Unit, Unit> OnBackButtonClicked { get; set; }

        public ReturnViewModel()
        {
            OnReturnButtonClicked = ReactiveCommand.Create<Unit, LentableTool>((unit) => ScannedTool);
            OnBackButtonClicked = ReactiveCommand.Create(() => { });
        }

        public void OnBarcodeInput(string input)
        {
            LogWriter.Write($"Recieved \"{input}\"");

            if (!Guid.TryParse(input, out Guid guid))
            {
                return;
            }

            foreach (var tool in ToolDataBase.Tools)
            {
                if (tool.ID == guid)
                {
                    ScannedTool = tool;
                    return;
                }
            }
        }

        private StringBuilder InputText { get; set; } = new StringBuilder();

        public override void OnWindowKeyDown(object sender, KeyEventArgs e)
        {
            if (e.Key == Key.Enter)
            {
                OnBarcodeInput(InputText.ToString());
                InputText = new StringBuilder();
            }
            else if (e.Key == Key.F11)
            {
                ScannedTool = new LentableTool();
                ScannedTool.Name = "TestTool";
            }
            else
            {
                InputText.Append(e.Key.ConvertToString());
            }
        }
    }
}
