using Avalonia;
using Avalonia.Controls;
using Avalonia.Markup.Xaml;

namespace Yatsugi.Views
{
    public class ToolManagerView : UserControl
    {
        public ToolManagerView()
        {
            InitializeComponent();
        }

        private void InitializeComponent()
        {
            AvaloniaXamlLoader.Load(this);
        }
    }
}