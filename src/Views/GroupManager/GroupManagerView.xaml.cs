using Avalonia;
using Avalonia.Controls;
using Avalonia.Markup.Xaml;

namespace Yatsugi.Views
{
    public class GroupManagerView : UserControl
    {
        public GroupManagerView()
        {
            InitializeComponent();
        }

        private void InitializeComponent()
        {
            AvaloniaXamlLoader.Load(this);
        }
    }
}