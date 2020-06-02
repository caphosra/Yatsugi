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
    public class HistoryViewModel : ViewModelBase
    {
        public List<MyString> History { get; set; }
        public ReactiveCommand<Unit, Unit> OnBackButtonClicked { get; set; }

        public HistoryViewModel(Guid id)
        {
            var records = ToolDataBase.Tools
                .Single((tool) => tool.ID == id)
                .History;
            records.ForEach((record) =>
            {
                History.Add(new MyString($"{record.Start.ToString()}: {record.Group.Name}に貸出"));
                if (record.End != null)
                {
                    History.Add(new MyString($"{record.End.ToString()}: {record.Group.Name}から返却"));
                }
            });
            this.RaisePropertyChanged("History");

            OnBackButtonClicked = ReactiveCommand.Create(() => { });
        }

        public class MyString
        {
            public string Text { get; set; }

            public MyString(string text)
            {
                Text = text;
            }
        }
    }
}
