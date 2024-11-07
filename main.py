# This is a sample Python script.
from modelinit import *
import warnings
warnings.filterwarnings("ignore")
# Press Shift+F10 to execute it or replace it with your code.
# Press Double Shift to search everywhere for classes, files, tool windows, actions, and settings.


def main():
    model_file= 'model.pth'
    pretrained_model = ModelInit(model_file, 'cpu')

    pred = pretrained_model.predict("D:/new_disorder_speeches_over_2000/Speeches/39.1.wav")
    print(pred)

main()
# Press the green button in the gutter to run the script.
# if __name__ == '__main__':
#     print_hi('PyCharm')

# See PyCharm help at https://www.jetbrains.com/help/pycharm/
