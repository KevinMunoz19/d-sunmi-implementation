import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  Button,
  View,
  SafeAreaView,
} from 'react-native';
import Modal from 'react-native-modal';

export default CustomModal = () => {
    const [visibleModalId, setVisibleModalId] = useState({visibleModal: 'default'});

    renderModalContent = () => (
        <View style={styles.content}>
            <Text style={styles.contentTitle}>Hi 👋!</Text>
            <Button
                onPress={() => setVisibleModalId({visibleModal: null})}
                title="Close"
            />
        </View>
    );

    handleOnScroll = event => {
        setVisibleModalId({
        scrollOffset: event.nativeEvent.contentOffset.y,
        });
    };

    handleScrollTo = p => {
        if (scrollViewRef) {
            scrollViewRef.scrollTo(p);
        }
    };

    return (
      <View style={styles.container}>
            <Button
            onPress={() => setVisibleModalId({visibleModal: 'default'})}
            title="Default"
            />
            {/* <Button
            onPress={() => setVisibleModalId({visibleModal: 'sliding'})}
            title="Sliding from the sides"
            />
            <Button
            onPress={() => setVisibleModalId({visibleModal: 'slow'})}
            title="Sloooow"
            /> */}
            <Button
            onPress={() => setVisibleModalId({visibleModal: 'fancy'})}
            title="Fancy!"
            />
            <Button
            onPress={() => setVisibleModalId({visibleModal: 'bottom'})}
            title="Bottom half"
            />
            <Button
            onPress={() => setVisibleModalId({visibleModal: 'backdropPress'})}
            title="Close on backdrop press"
            />
            {/* <Button
            onPress={() => setVisibleModalId({visibleModal: 'swipeable'})}
            title="Swipeable"
            />
            <Button
            onPress={() => setVisibleModalId({visibleModal: 'scrollable'})}
            title="Scrollable"
            />
            <Button
            onPress={() => setVisibleModalId({visibleModal: 'customBackdrop'})}
            title="Custom backdrop"
            /> */}
            <Modal isVisible={visibleModalId.visibleModal === 'default'}>
                {renderModalContent()}
            </Modal>
            {/* <Modal
            isVisible={visibleModalId.visibleModal === 'sliding'}
            animationIn="slideInLeft"
            animationOut="slideOutRight">
            {renderModalContent()}
            </Modal> */}
            {/* <Modal
            isVisible={visibleModalId.visibleModal === 'slow'}
            animationInTiming={1000}
            animationOutTiming={1000}
            backdropTransitionInTiming={800}
            backdropTransitionOutTiming={800}>
            {renderModalContent()}
            </Modal> */}
            <Modal
            isVisible={visibleModalId.visibleModal === 'fancy'}
            backdropColor="#B4B3DB"
            backdropOpacity={0.8}
            animationIn="zoomInDown"
            animationOut="zoomOutUp"
            animationInTiming={600}
            animationOutTiming={600}
            backdropTransitionInTiming={600}
            backdropTransitionOutTiming={600}>
            {renderModalContent()}
            </Modal>
            {/* <Modal
            isVisible={visibleModalId.visibleModal === 'bottom'}
            onSwipeComplete={() => setVisibleModalId({visibleModal: null})}
            swipeDirection={['up', 'left', 'right', 'down']}
            style={styles.bottomModal}>
            {renderModalContent()}
            </Modal> */}
            <Modal
            isVisible={visibleModalId.visibleModal === 'backdropPress'}
            onBackdropPress={() => setVisibleModalId({visibleModal: null})}>
            {renderModalContent()}
            </Modal>
            {/* <Modal
            isVisible={visibleModalId.visibleModal === 'swipeable'}
            onSwipeComplete={() => setVisibleModalId({visibleModal: null})}
            swipeDirection={['down']}>
            {renderModalContent()}
            </Modal> */}
            {/* <Modal
            isVisible={visibleModalId.visibleModal === 'scrollable'}
            onSwipeComplete={() => setVisibleModalId({visibleModal: null})}
            swipeDirection="down"
            scrollTo={handleScrollTo}
            scrollOffset={visibleModalId.scrollOffset}
            scrollOffsetMax={400 - 300} // content height - ScrollView height
            style={styles.bottomModal}>
                <View style={styles.scrollableModal}>
                    <ScrollView
                    ref={ref => (scrollViewRef = ref)}
                    onScroll={handleOnScroll}
                    scrollEventThrottle={16}>
                    <View style={styles.scrollableModalContent1}>
                        <Text style={styles.scrollableModalText1}>
                        You can scroll me up! 👆
                        </Text>
                    </View>
                    <View style={styles.scrollableModalContent2}>
                        <Text style={styles.scrollableModalText2}>
                        Same here as well! ☝
                        </Text>
                    </View>
                    </ScrollView>
                </View>
            </Modal> */}
            {/* <Modal
            isVisible={visibleModalId.visibleModal === 'customBackdrop'}
            customBackdrop={
                <SafeAreaView style={styles.customBackdrop}>
                <Text style={styles.customBackdropText}>
                    I'm in the backdrop! 👋
                </Text>
                </SafeAreaView>
            }>
            {renderModalContent()}
            </Modal> */}
        </View>
    );
  
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  content: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  contentTitle: {
    fontSize: 20,
    marginBottom: 12,
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  scrollableModal: {
    height: 300,
  },
  scrollableModalContent1: {
    height: 200,
    backgroundColor: '#87BBE0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollableModalText1: {
    fontSize: 20,
    color: 'white',
  },
  scrollableModalContent2: {
    height: 200,
    backgroundColor: '#A9DCD3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollableModalText2: {
    fontSize: 20,
    color: 'white',
  },
  customBackdrop: {
    flex: 1,
    backgroundColor: '#87BBE0',
    alignItems: 'center',
  },
  customBackdropText: {
    marginTop: 10,
    fontSize: 17,
  },
});