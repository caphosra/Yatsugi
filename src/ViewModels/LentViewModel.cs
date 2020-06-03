using System;
using System.Collections.Generic;
using System.IO;
using System.Reactive;
using System.Text;
using System.Threading.Tasks;
using System.Linq;

using Avalonia.Data.Converters;
using Avalonia.Input;
using ReactiveUI;

using Yatsugi.Models;
using Yatsugi.Models.DataTypes;

namespace Yatsugi.ViewModels
{
    public class LentViewModel : ViewModelBase
    {
        private LentGroup scannedGroup;
        public LentGroup ScannedGroup
        {
            get => scannedGroup;
            set
            {
                scannedGroup = value;
                this.RaisePropertyChanged("ScannedGroupName");
                this.RaisePropertyChanged("StatusImageUrl");
                this.RaisePropertyChanged("LentButtonEnabled");
            }
        }

        private LentableTool scannedTool;
        public LentableTool ScannedTool
        {
            get => scannedTool;
            set
            {
                scannedTool = value;
                this.RaisePropertyChanged("ScannedToolName");
                this.RaisePropertyChanged("StatusImageUrl");
                this.RaisePropertyChanged("LentButtonEnabled");
            }
        }

        public string ScannedGroupName => ScannedGroup != null ? ScannedGroup.Name : "Waiting for scan...";

        public string ScannedToolName => ScannedTool != null ? ScannedTool.Name : "Waiting for scan...";

        public string StatusImageUrl => ScannedGroup == null || ScannedTool == null ? "resm:Yatsugi.Assets.Loading.gif" : "resm:Yatsugi.Assets.OKCheck.gif";

        public bool LentButtonEnabled => ScannedGroup != null && ScannedTool != null;

        public ReactiveCommand<Unit, (LentGroup group, LentableTool tool)> OnLentButtonClicked { get; set; }
        public ReactiveCommand<Unit, Unit> OnBackButtonClicked { get; set; }

        public LentViewModel()
        {
            OnLentButtonClicked = ReactiveCommand.Create<Unit, (LentGroup, LentableTool)>((unit) => (ScannedGroup, ScannedTool));
            OnBackButtonClicked = ReactiveCommand.Create(() => { });
        }

        public void OnBarcodeInput(string input)
        {
            LogWriter.Write($"Recieved \"{input}\"");

            if (Guid.TryParse(input, out Guid guid))
            {
                foreach (var tool in ToolDataBase.Tools)
                {
                    if (tool.ID == guid)
                    {
                        ScannedTool = tool;
                        return;
                    }
                }

                foreach (var group in ToolDataBase.Groups)
                {
                    if (group.ID == guid)
                    {
                        ScannedGroup = group;
                        return;
                    }
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
                ScannedGroup = new LentGroup();
                ScannedGroup.Name = "TestGroup";
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
