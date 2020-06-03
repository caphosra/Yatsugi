using System;
using System.Collections.Generic;
using System.IO;
using System.Reactive;
using System.Text;
using System.Threading.Tasks;
using System.Linq;

using Avalonia.Input;
using ReactiveUI;

using Yatsugi.Models;
using Yatsugi.Models.DataTypes;

namespace Yatsugi.ViewModels
{
    public class GroupListViewModel : ViewModelBase
    {
        public ReactiveCommand<Unit, Unit> OnAddButtonClicked { get; set; }
        public ReactiveCommand<Guid, Guid> OnManageButtonClicked { get; set; }
        public ReactiveCommand<Guid, Guid> OnQRCodeButtonClicked { get; set; }
        public ReactiveCommand<Guid, Guid> OnDeleteButtonClicked { get; set; }
        public ReactiveCommand<Unit, Unit> OnBackButtonClicked { get; set; }

        public List<RenderableGroup> Groups { get; set; }

        public GroupListViewModel()
        {
            OnAddButtonClicked = ReactiveCommand.Create(() => { });
            OnManageButtonClicked = ReactiveCommand.Create<Guid, Guid>((guid) => guid);
            OnQRCodeButtonClicked = ReactiveCommand.Create<Guid, Guid>((guid) => guid);
            OnDeleteButtonClicked = ReactiveCommand.Create<Guid, Guid>((guid) => guid);
            OnBackButtonClicked = ReactiveCommand.Create(() => { });

            Groups = ToolDataBase.Groups
                .Select((group) =>
                {
                    var item = new RenderableGroup(group);
                    item.OnManageButtonClicked
                        .InvokeCommand(OnManageButtonClicked);
                    item.OnQRCodeButtonClicked
                        .InvokeCommand(OnQRCodeButtonClicked);
                    item.OnDeleteButtonClicked
                        .InvokeCommand(OnDeleteButtonClicked);
                    return item;
                })
                .ToList();
        }

        public class RenderableGroup
        {
            public string Name { get; set; }
            public Guid ID { get; set; }
            public string StatusMessage => RentNow ? "貸出器材あり" : "全て返却済み";
            public bool RentNow { get; set; }

            public ReactiveCommand<Unit, Guid> OnManageButtonClicked { get; set; }
            public ReactiveCommand<Unit, Guid> OnQRCodeButtonClicked { get; set; }
            public ReactiveCommand<Unit, Guid> OnDeleteButtonClicked { get; set; }

            public RenderableGroup(LentGroup group)
            {
                Name = group.Name;
                ID = group.ID;
                RentNow = ToolDataBase.Tools
                    .Any((tool) => tool.History.Any((record) => record.End == null && record.Group.ID == group.ID));

                OnManageButtonClicked = ReactiveCommand.Create<Unit, Guid>((unit) =>
                {
                    return group.ID;
                });
                OnQRCodeButtonClicked = ReactiveCommand.Create<Unit, Guid>((unit) =>
                {
                    return group.ID;
                });
                OnDeleteButtonClicked = ReactiveCommand.Create<Unit, Guid>((unit) =>
                {
                    return group.ID;
                });
            }
        }
    }
}
