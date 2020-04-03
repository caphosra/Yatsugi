using Avalonia.Input;
using ReactiveUI;

namespace Yatsugi.ViewModels
{
    public class ViewModelBase : ReactiveObject
    {
        public virtual void OnWindowKeyDown(object sender, KeyEventArgs e) { }
    }
}
