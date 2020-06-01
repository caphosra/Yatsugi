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
    public class ToolListViewModel : ViewModelBase
    {
        public ReactiveCommand<Unit, Unit> OnAddButtonClicked { get; set; }
        public ReactiveCommand<Guid, Guid> OnManageButtonClicked { get; set; }
        public ReactiveCommand<Guid, Guid> OnHistoryButtonClicked { get; set; }
        public ReactiveCommand<Guid, Guid> OnDeleteButtonClicked { get; set; }
        public ReactiveCommand<Unit, Unit> OnBackButtonClicked { get; set; }

        public List<RenderableTool> Tools { get; set; }

        public ToolListViewModel()
        {
            OnAddButtonClicked = ReactiveCommand.Create(() => { });
            OnManageButtonClicked = ReactiveCommand.Create<Guid, Guid>((guid) => guid);
            OnHistoryButtonClicked = ReactiveCommand.Create<Guid, Guid>((guid) => guid);
            OnDeleteButtonClicked = ReactiveCommand.Create<Guid, Guid>((guid) => guid);
            OnBackButtonClicked = ReactiveCommand.Create(() => { });

            Tools = ToolDataBase.Tools
                .Select((tool) =>
                {
                    var item = new RenderableTool(tool);
                    item.OnManageButtonClicked
                        .InvokeCommand(OnManageButtonClicked);
                    item.OnHistoryButtonClicked
                        .InvokeCommand(OnHistoryButtonClicked);
                    item.OnDeleteButtonClicked
                        .InvokeCommand(OnDeleteButtonClicked);
                    return item;
                })
                .ToList();
        }

        public class RenderableTool
        {
            public string Name { get; set; }
            public Guid ID { get; set; }
            public string RentTo { get; set; }

            public ReactiveCommand<Unit, Guid> OnManageButtonClicked { get; set; }
            public ReactiveCommand<Unit, Guid> OnHistoryButtonClicked { get; set; }
            public ReactiveCommand<Unit, Guid> OnDeleteButtonClicked { get; set; }

            public RenderableTool(LentableTool tool)
            {
                Name = tool.Name;
                ID = tool.ID;
                RentTo = tool.RentTo;

                OnManageButtonClicked = ReactiveCommand.Create<Unit, Guid>((unit) =>
                {
                    return tool.ID;
                });
                OnHistoryButtonClicked = ReactiveCommand.Create<Unit, Guid>((unit) =>
                {
                    return tool.ID;
                });
                OnDeleteButtonClicked = ReactiveCommand.Create<Unit, Guid>((unit) =>
                {
                    return tool.ID;
                });
            }
        }
    }
}
