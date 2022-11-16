import { shallowMount } from '@vue/test-utils';
import BaseEditItem from '@/components/Base/BaseEditItem.vue';

describe('BaseEditItem.vue', () => {
  it('input mounted', () => {
    const initValue = 'init text';
    const wrapper = shallowMount(BaseEditItem, {
      props: { initValue },
    });
    expect(wrapper.find('input').exists()).toBe(true);
  });

  it('modify value and emit event at enter', async () => {
    const initValue = 'init text';
    const wrapper = shallowMount(BaseEditItem, {
      props: { initValue },
    });

    const childInput = wrapper.find('input');
    childInput.trigger('blur');
    await wrapper.vm.$nextTick(); // Wait until $emits have been handled

    const saveEmitted = wrapper.emitted('save-edition');
    // assert event has been emitted
    expect(saveEmitted).toBeTruthy();

    if (saveEmitted !== undefined) {
      // assert event payload
      expect(saveEmitted[0][0]).toEqual(`${initValue}`);
    }
  });

  it('emit cancel event at scape', async () => {
    const initValue = 'init text';
    const wrapper = shallowMount(BaseEditItem, {
      props: { initValue },
    });

    const childInput = wrapper.find('input');
    childInput.trigger('keydown.esc');
    await wrapper.vm.$nextTick(); // Wait until $emits have been handled

    const discardEmitted = wrapper.emitted('discard-edition');
    // assert event has been emitted
    expect(discardEmitted).toBeTruthy();
  });
});
