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
    public class AddGroupViewModel : ViewModelBase
    {
        public string Name { get; set; }

        private Guid m_ID = Guid.Empty;
        public Guid ID
        {
            get => m_ID;
            private set => this.RaiseAndSetIfChanged(ref m_ID, value);
        }

        private bool m_IsNewGroup = false;
        public bool IsNewGroup
        {
            get => m_IsNewGroup;
            set
            {
                m_IsNewGroup = value;
                this.RaisePropertyChanged("IsNewGroup");
                this.RaisePropertyChanged("AddGroupViewTitle");
            }
        }

        public string AddGroupViewTitle => IsNewGroup ? "団体の追加" : "団体の管理";

        public ReactiveCommand<Unit, LentGroup> OnSaveButtonClicked { get; set; }

        public ReactiveCommand<Unit, Unit> OnBackButtonClicked { get; set; }

        public AddGroupViewModel(Guid id)
        {
            if (id == Guid.Empty)
            {
                ID = Guid.NewGuid();
                IsNewGroup = true;
            }
            else
            {
                ID = id;
                Name = ToolDataBase.Groups.Single((group) => group.ID == id).Name;
            }

            OnSaveButtonClicked = ReactiveCommand.Create<Unit, LentGroup>((unit) =>
            {
                var tool = new LentGroup();
                tool.ID = ID;
                tool.Name = Name;
                return tool;
            });

            OnBackButtonClicked = ReactiveCommand.Create(() => { });
        }
    }
}
