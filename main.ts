let buttonState = 0
// 按鈕 A 發送端
// 無線電組ID
let RADIO_GROUP = 121
// 當前按鈕狀態
// 上次按鈕狀態
let lastState = -1
// 初始化
radio.setGroup(RADIO_GROUP)
// 顯示"A"表示按鈕A
basic.showString("A")
basic.pause(100)
basic.clearScreen()
// 主循環：檢測按鈕狀態
basic.forever(function () {
    // 讀取P0按鈕狀態（0:按下, 1:鬆開）
    buttonState = pins.digitalReadPin(DigitalPin.P0)
    // 僅在狀態變化時發送
    if (buttonState != lastState) {
        if (buttonState == 0) {
            // 按下
            // 發送前進信號
            radio.sendNumber(12)
            // 向上箭頭
            basic.showLeds(`
                . . # . .
                . # # # .
                # # # # #
                . . # . .
                . . # . .
                `)
        } else {
            // 鬆開
            // 發送停止信號
            radio.sendNumber(14)
            // 顯示停止圖標
            basic.showIcon(IconNames.No)
        }
        lastState = buttonState
    }
    // 降低延遲，加快響應
    basic.pause(20)
})
