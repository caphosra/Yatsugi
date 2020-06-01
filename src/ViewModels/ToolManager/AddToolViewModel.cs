using System;
using System.Collections.Generic;
using System.IO;
using System.Reactive;
using System.Reactive.Linq;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Avalonia.Input;
using ReactiveUI;

using Yatsugi.Models;
using Yatsugi.Models.DataTypes;

namespace Yatsugi.ViewModels
{
    public class AddToolViewModel : ViewModelBase
    {
        public string Name { get; set; }

        private Guid m_ID = Guid.Empty;
        public Guid ID
        {
            get => m_ID;
            private set => this.RaiseAndSetIfChanged(ref m_ID, value);
        }

        private bool m_IsNewTool = false;
        public bool IsNewTool
        {
            get => m_IsNewTool;
            set
            {
                m_IsNewTool = value;
                this.RaisePropertyChanged("IsNewTool");
                this.RaisePropertyChanged("AddToolViewTitle");
            }
        }

        public string AddToolViewTitle => IsNewTool ? "工具の追加" : "工具の管理";

        public ReactiveCommand<Unit, LentableTool> OnSaveButtonClicked { get; set; }

        public ReactiveCommand<Unit, Unit> OnBackButtonClicked { get; set; }

        public AddToolViewModel(Guid id)
        {
            if (id == Guid.Empty)
            {
                ID = Guid.NewGuid();
                IsNewTool = true;
            }
            else
            {
                ID = id;
                Name = ToolDataBase.Tools.Single((tool) => tool.ID == id).Name;
            }

            OnSaveButtonClicked = ReactiveCommand.Create<Unit, LentableTool>((unit) =>
            {
                var tool = new LentableTool();
                tool.ID = ID;
                tool.Name = Name;
                return tool;
            });

            OnBackButtonClicked = ReactiveCommand.Create(() => { });
        }
    }
}
