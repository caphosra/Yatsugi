using System;

using Avalonia.Input;
using ReactiveUI;

using Yatsugi.Views;

namespace Yatsugi.ViewModels
{
    public class ViewModelBase : ReactiveObject
    {
        public virtual void OnWindowOpened(MainWindow window) { }
        public virtual void OnWindowKeyDown(object sender, KeyEventArgs e) { }
    }
}
